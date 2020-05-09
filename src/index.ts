
const BigNumber = require('bignumber.js');
const Web3EthAbi = require('web3-eth-abi');
const Chain3 = require('chain3');
const axios = require("axios");
var fetch = axios.create({ headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });

const chain3 = new Chain3();

import { InitConfig, Account, moacCfg } from "./model";

class Liberum {
    private static vnodeVia: string[];
    private static dappAddr: string;
    private static pairsAddr: string;
    private static subchainaddr: string;
    private static scsUri: string[];
    private static vnodeUri: string[];
    private static netWork: number;
    private static timeOut: number;

    public static async init(InitConfig: InitConfig): Promise<void> {
        new Promise<void>((reject) => {
            try {
                Liberum.vnodeVia = InitConfig.vnodeVia;
                Liberum.dappAddr = InitConfig.dappAddr;
                Liberum.pairsAddr = InitConfig.pairsAddr;
                Liberum.scsUri = InitConfig.scsUri;
                Liberum.vnodeUri = InitConfig.vnodeUri;
                Liberum.netWork = InitConfig.netWork;
                Liberum.timeOut = InitConfig.timeOut;
                Liberum.subchainaddr = InitConfig.subchainAddr;
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * 子链原生币合约充值
     * @param {Account} account 充值账户
     * @param {number} value 充值数量
     * @param { number } decimal token精度
     */
    public static async deposit(account: Account, value: number) {
        try {
            let data = Liberum.dappAddr + chain3.sha3('deposit()').substr(2, 8);
            let res = await Liberum.sendRawTransaction(account.address, account.secret, value, data)
            return res;
        } catch (error) {
            throw error
        }
    }

    /**
     * 子链原生币合约提币
     * @param {Account} account 提币账户
     * @param {number} value 提币数量
     * 
     */
    public static async withdraw(account: Account, value: number) {
        try {
            let data = Liberum.dappAddr + chain3.sha3('withdraw(uint256)').substr(2, 8)
                + chain3.encodeParams(['uint256'], [chain3.toSha(value, 'mc')]);
            let res = await Liberum.sendRawTransaction(account.address, account.secret, 0, data)
            return res;
        } catch (error) {
            throw error
        }
    }

    /**
     * 子链token合约充值
     * @param {Account} account 充值账户
     * @param {address} token 充值token地址
     * @param {number} value 充值数量
     * @param { number } decimal token精度
     */
    public static async depositToken(account: Account, token: string, value: number, decimal: number) {
        try {
            await Liberum.approve(account, Liberum.dappAddr, token, value, decimal)
            let data = Liberum.dappAddr + chain3.sha3('depositToken(address,uint256)').substr(2, 8)
                + chain3.encodeParams(['address', 'uint256'], [token, new BigNumber(value).multipliedBy(10 ** decimal)]);
            let res = await Liberum.sendRawTransaction(account.address, account.secret, 0, data)
            return res;
        } catch (error) {
            throw error
        }
    }

    /**
     * 子链token合约提现
     * @param {Account} account 提现账户
     * @param {address} token 提现token地址
     * @param {number}  value 提现数量
     * @param { number } decimal token精度
     */
    public static async withdrawToken(account: Account, token: string, value: number, decimal: number) {
        try {
            let data = Liberum.dappAddr + chain3.sha3('withdrawToken(address,uint256)').substr(2, 8)
                + chain3.encodeParams(['address', 'uint256'], [token, new BigNumber(value).multipliedBy(10 ** decimal)]);
            let res = await Liberum.sendRawTransaction(account.address, account.secret, 0, data)
            return res;
        } catch (error) {
            throw error
        }
    }

    /**
     * 合约充提余额查询
     * @param {address} token token地址
     * @param {address} address 查询地址
     */
    public static async balanceOf(token: string, address: string, decimal: number) {
        try {
            let data = chain3.sha3('balanceOf(address,address)').substr(0, 10)
                + chain3.encodeParams(['address', 'address'], [token, address]);
            let res: any = await Liberum.getBalance(Liberum.subchainaddr, Liberum.dappAddr, data)
            let erc20Data = chain3.sha3('balanceOf(address)').substr(0, 10)
                + chain3.encodeParams(['address'], [address]);
            let erc20Balance = await Liberum.getERC20Balance(Liberum.subchainaddr, token, erc20Data)
            let balance = {
                balance: new BigNumber(res.balance).dividedBy(10 ** decimal).toString(),
                freeze: new BigNumber(res.freeze).dividedBy(10 ** decimal).toString(),
                erc20Balance: new BigNumber(erc20Balance).dividedBy(10 ** decimal).toString()
            }
            return balance
        } catch (error) {
            throw (error)
        }
    }

    /**
     * 创建挂单
     * @param {Account} account 挂单账户
     * @param {address} tokenGet 获取token地址
     * @param {number} amountGet 获取token数量
     * @param { number } tokenGetDecimal 获取token精度
     * @param {address} tokenGive 付出token地址
     * @param {number} amountGive 付出token数量
     * @param { number } tokenGiveDecimal 付出token精度
     * @param {number} expires 有效区块
     */
    public static async createOrder(account: Account, tokenGet: string, amountGet: number, tokenGetDecimal: number, tokenGive: string, amountGive: number, tokenGiveDecimal: number, expires: number) {
        try {
            let nonce = await Liberum.getNonce(Liberum.subchainaddr, account.address);
            let blockNum = await Liberum.getBlockNumber(Liberum.subchainaddr);
            let blockNumber: number = chain3.toDecimal(blockNum) + expires
            let data = Liberum.dappAddr + chain3.sha3('order(address,uint256,address,uint256,uint256,uint256)').substr(2, 8)
                + chain3.encodeParams(['address', 'uint256', 'address', 'uint256', 'uint256', 'uint256'],
                    [tokenGet, new BigNumber(amountGet).multipliedBy(10 ** tokenGetDecimal), tokenGive, new BigNumber(amountGive).multipliedBy(10 ** tokenGiveDecimal), blockNumber, nonce]);
            let res = await Liberum.sendRawTransaction(account.address, account.secret, 0, data)
            return { res, nonce, blockNum };
        } catch (error) {
            throw error
        }
    }

    /**
     * 挂单买卖
     * @param {Account} account 买家账户
     * @param {address} tokenGet 买家付出的token地址
     * @param {number} amountGet 买家付出的token数量
     * @param {number} tokenGetDecimal token精度
     * @param {address} tokenGive 买家获得的token地址
     * @param {number} amountGive 买家获得的token数量
     * @param {number} tokenGiveDecimal Token精度
     * @param {address} user 卖家地址
     * @param {number} amount 买家购买数量
     * @param {number} nonce 挂单时nonce
     * @param {number} blockNum 挂单时blockNum
     */
    public static async tradeOrder(account: Account, tokenGet: string, amountGet: number, tokenGetDecimal: number, tokenGive: string, amountGive: number, tokenGiveDecimal: number, user: string, amount: number, nonce: number, blockNum: number) {
        try {
            var data = Liberum.dappAddr + chain3.sha3('trade(address,uint256,address,uint256,uint256,uint256,address,uint256)').substr(2, 8)
                + chain3.encodeParams(['address', 'uint256', 'address', 'uint256', 'uint256', 'uint256', 'address', 'uint256'],
                    [tokenGet, new BigNumber(amountGet).multipliedBy(10 ** tokenGetDecimal).toString(), tokenGive, new BigNumber(amountGive).multipliedBy(10 ** tokenGiveDecimal).toString(), blockNum, nonce, user,
                        new BigNumber(amount).multipliedBy(10 ** tokenGetDecimal).toString()]);
            let res = await Liberum.sendRawTransaction(account.address, account.secret, 0, data)
            return res;
        } catch (error) {
            throw error
        }
    }

    /**
     * 取消挂单
     * @param {Account} account 取消账户
     * @param {address} tokenGet 挂单获取token地址
     * @param {number} amountGet 挂单获取token数量
     * @param { number } tokenGetDecimal 挂单获取token精度
     * @param {address} tokenGive 挂单付出token地址
     * @param {number} amountGive 挂单付出token数量
     * @param { number } tokenGiveDecimal 挂单付出token精度
     * @param {number} nonce 挂单时nonce
     * @param {number} blockNum 挂单时blockNum
     */
    public static async cancelOrder(account: Account, tokenGet: string, amountGet: number, tokenGetDecimal: number, tokenGive: string, amountGive: number, tokenGiveDecimal: number, nonce: number, blockNum: number) {
        try {
            let data = Liberum.dappAddr + chain3.sha3('cancelOrder(address,uint256,address,uint256,uint256,uint256)').substr(2, 8)
                + chain3.encodeParams(['address', 'uint256', 'address', 'uint256', 'uint256', 'uint256'],
                    [tokenGet, new BigNumber(amountGet).multipliedBy(10 ** tokenGetDecimal), tokenGive, new BigNumber(amountGive).multipliedBy(10 ** tokenGiveDecimal), blockNum, nonce]);

            let res = await Liberum.sendRawTransaction(account.address, account.secret, 0, data)
            return res;
        } catch (error) {

        }
    }

    /**
     * ERC20转账
     * @param fromAccount 发起转账账户
     * @param toAddress 转账目标账户
     * @param tokenAdd 转账Token地址
     * @param amount 转账数量
     * @param tokenDecimal 转账Token精度
     * @param logs 转账备注
     */
    public static async transferERC20(fromAccount: Account, toAddress: string, tokenAdd: string, amount: number, tokenDecimal: number, logs: string) {
        try {
            let data = tokenAdd + chain3.sha3('transfer(address,uint256)').substr(2, 8) +
                chain3.encodeParams(['address', 'uint256'], [toAddress, new BigNumber(amount).multipliedBy(10 ** tokenDecimal)])
            let memo = Buffer.from(logs).toString('hex')
            let res = await Liberum.sendRawTransaction(fromAccount.address, fromAccount.secret, 0, data + memo)
            return res;
        } catch (error) {
            throw error
        }
    }

    /**
     * 原生币转账
     * @param fromAccount 发起转账账户
     * @param toAddress 转账目标账户
     * @param amount 转账数量
     * @param logs 转账备注
     */
    public static async transfer(fromAccount: Account, toAddress: string, amount: number, logs: string) {
        try {
            let memo = Buffer.from(logs).toString('hex')
            let data = toAddress + memo;
            let res = await Liberum.sendRawTransaction(fromAccount.address, fromAccount.secret, amount, data)
            return res
        } catch (error) {
            throw error
        }
    }

    /**
     * 添加交易对
     * @param base base Token地址
     * @param counter counter Token地址
     * @param baseAccount 合约部署者账户
     */
    public static async addPair(base: string, counter: string, baseAccount: Account) {
        try {
            let data = Liberum.pairsAddr + chain3.sha3('addPair(address,address)').substr(2, 8) +
                chain3.encodeParams(['address', 'address'], [base, counter]);
            let res = await Liberum.sendRawTransaction(baseAccount.address, baseAccount.secret, 0, data);
            return res;
        } catch (error) {
            throw error
        }
    }

    /**
     * 移除交易对
     * @param base base Token地址
     * @param counter counter Token地址
     * @param baseAccount 合约部署者账户
     */
    public static async removePair(base: string, counter: string, baseAccount: Account) {
        try {
            let data = Liberum.pairsAddr + chain3.sha3('removePair(address,address)').substr(2, 8) +
                chain3.encodeParams(['address', 'address'], [base, counter]);
            let res = await Liberum.sendRawTransaction(baseAccount.address, baseAccount.secret, 0, data);
            return res;
        } catch (error) {
            throw error
        }
    }

    /**
     * 修改pairs合约地址
     * @param baseAccount 合约部署者账户
     * @param pairAddr 修改后的pairs合约地址
     */
    public static async changePairAddr(baseAccount: Account, pairAddr: string) {
        try {
            if (chain3.isAddress(pairAddr)) {
                let data = Liberum.dappAddr + chain3.sha3('changePairAddr(address)').substr(2, 8)
                    + chain3.encodeParams(['address'], [pairAddr]);
                let res = await Liberum.sendRawTransaction(baseAccount.address, baseAccount.secret, 0, data)
                return res;
            } else {
                throw new Error('invalid address');
            }
        } catch (error) {
            throw error
        }
    }

    /**
     * 修改挂单冻结token数量
     * @param baseAccount 合约部署者账户
     * @param newAmount 新的冻结数量
     */
    public static async changeFreezeAmount(baseAccount: Account, newAmount: string, tokenDecimal: number, ) {
        try {
            let data = Liberum.dappAddr + chain3.sha3('changeFreezeAmount(uint256)').substr(2, 8)
                + chain3.encodeParams(['uint256'], [new BigNumber(newAmount).multipliedBy(10 ** tokenDecimal)]);
            let res = await Liberum.sendRawTransaction(baseAccount.address, baseAccount.secret, 0, data)
            return res;
        } catch (error) {
            throw error
        }
    }

    /**
     * 修改挂单冻结token地址
     * @param baseAccount 合约部署者账户
     * @param newToken 新的冻结币种
     */
    public static async changeFreezeToken(baseAccount: Account, newToken: string) {
        try {
            if (chain3.isAddress(newToken)) {
                let data = Liberum.dappAddr + chain3.sha3('changeFreezeToken(address)').substr(2, 8)
                    + chain3.encodeParams(['address'], [newToken]);
                let res = await Liberum.sendRawTransaction(baseAccount.address, baseAccount.secret, 0, data)
                return res;
            } else {
                throw new Error('invalid address');
            }
        } catch (error) {
            throw error
        }
    }

    /**
     * 发起交易
     * @param {address} from 发起交易地址
     * @param {string} secret 发起交易地址密钥
     * @param {string} data 交易数据
     * @param { number } decimal token精度
     */
    public static async sendRawTransaction(from: string, secret: string, value: number, data: string) {
        return new Promise(async (resolve) => {
            try {
                let nonce = await Liberum.getNonce(Liberum.subchainaddr, from);
                let tmp = Liberum.getMoacCfg()
                let rawTx = {
                    from: from,
                    to: Liberum.subchainaddr,
                    nonce: chain3.toHex(nonce),
                    gasLimit: chain3.toHex("0"),
                    gasPrice: chain3.toHex("0"),
                    value: chain3.toHex(chain3.toSha(value, 'mc')),
                    chainId: chain3.toHex(Liberum.netWork),
                    via: tmp.vnodeVia,
                    shardingFlag: "0x1",
                    data: data
                };
                let signTx = chain3.signTransaction(rawTx, secret);
                let params = JSON.stringify({ "jsonrpc": "2.0", "method": "mc_sendRawTransaction", "params": [signTx], "id": 101 })
                let response = await fetch.post(tmp.vnodeUrl, params).catch(error => {
                    resolve({ "result": "error", "code": error.response.status });
                });
                if (!response) { return }
                let txHash = response.data.result;
                if (txHash) {
                    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getReceiptByHash", "params": [Liberum.subchainaddr, txHash], "id": 101 })
                    let i = 0;
                    while (true) {
                        i++
                        if (i > Liberum.timeOut) {
                            resolve({ "result": "error", "hash": txHash });
                            return
                        } else {
                            let res = await fetch.post(tmp.scsUrl, params);
                            let receipt = res.data.result;
                            if (receipt && !receipt.failed) {
                                resolve({ "result": "success", "hash": txHash });
                                return
                            } else if (receipt && receipt.failed) {
                                resolve({ "result": "error", "hash": txHash });
                                return
                            }
                        }
                        await new Promise(resolve => setTimeout(resolve, 2000))
                    }
                }
            } catch (error) {
                if (error.response && error.response.status) {
                    resolve({ "result": "error", "code": error.response.status });
                } else {
                    resolve({ "result": "error", "error": error });
                }
            }
        })
    }

    /**
     * 子链token授权
     * @param account 授权账户
     * @param to 被授权地址
     * @param tokenAdd token地址
     * @param amount 数量
     */
    public static async approve(account: Account, to: string, tokenAdd: string, amount: number, decimal: number) {
        return new Promise(async (resolve) => {
            try {
                let nonce = await Liberum.getNonce(Liberum.subchainaddr, account.address);
                let tmp = Liberum.getMoacCfg()
                let rawTx = {
                    from: account.address,
                    to: Liberum.subchainaddr,
                    nonce: chain3.toHex(nonce),
                    gasLimit: chain3.toHex("0"),
                    gasPrice: chain3.toHex("0"),
                    chainId: chain3.toHex(Liberum.netWork),
                    via: tmp.vnodeVia,
                    shardingFlag: "0x1",
                    data: tokenAdd + chain3.sha3('approve(address,uint256)').substr(2, 8) +
                        chain3.encodeParams(['address', 'uint256'], [to, new BigNumber(amount).multipliedBy(10 ** decimal)])
                };
                let signTx = chain3.signTransaction(rawTx, account.secret);
                let params = JSON.stringify({ "jsonrpc": "2.0", "method": "mc_sendRawTransaction", "params": [signTx], "id": 101 })
                let response = await fetch.post(tmp.vnodeUrl, params).catch(error => {
                    resolve({ "result": "error", "code": error.response.status });
                });
                if (!response) { return }
                let txHash = response.data.result;
                if (txHash) {
                    let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getReceiptByHash", "params": [Liberum.subchainaddr, txHash], "id": 101 })
                    let i = 0;
                    while (true) {
                        i++
                        if (i > Liberum.timeOut) {
                            resolve({ "result": "error", "hash": txHash });
                            return
                        } else {
                            let res = await fetch.post(tmp.scsUrl, params);
                            let receipt = res.data.result;
                            if (receipt && !receipt.failed) {
                                resolve({ "result": "success", "hash": txHash });
                                return
                            } else if (receipt && receipt.failed) {
                                resolve({ "result": "error", "hash": txHash });
                                return
                            }
                        }
                        await new Promise(resolve => setTimeout(resolve, 2000))
                    }
                }
            } catch (error) {
                if (error.response && error.response.status) {
                    resolve({ "result": "error", "code": error.response.status });
                } else {
                    resolve({ "result": "error", "error": error });
                }
            }
        })
    }

    private static async getNonce(subchainaddr: string, address: string) {
        return new Promise((resolve, reject) => {
            let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getNonce", "params": [subchainaddr, address], "id": 101 })
            let tmp = Liberum.getMoacCfg()
            fetch.post(tmp.scsUrl, params).then(function (response) {
                resolve(response.data.result)
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    private static async getBlockNumber(subchainaddr: string) {
        return new Promise((resolve, reject) => {
            let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getBlockNumber", "params": [subchainaddr], "id": 101 })
            let tmp = Liberum.getMoacCfg()
            fetch.post(tmp.scsUrl, params).then(function (response) {
                resolve(response.data.result)
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    private static async getBalance(subchainaddr: string, dappAddr: string, data: any) {
        return new Promise((resolve, reject) => {
            let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": subchainaddr, "dappAddr": dappAddr, "data": data }], "id": 101 })
            let tmp = Liberum.getMoacCfg();
            if (tmp.scsUrl) {
                fetch.post(tmp.scsUrl, params).then(function (response) {
                    let res = Web3EthAbi.decodeParameters([{ type: 'uint256', name: 'balance' }, { type: 'uint256', name: 'freeze' }], response.data.result);
                    resolve({ balance: res.balance, freeze: res.freeze })
                }).catch(function (error) {
                    reject(error);
                });
            }
        });
    }

    private static async getERC20Balance(subchainaddr: string, token: string, data: any) {
        return new Promise((resolve, reject) => {
            let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": subchainaddr, "dappAddr": token, "data": data }], "id": 101 })
            let tmp = Liberum.getMoacCfg()
            if (tmp.scsUrl) {
                fetch.post(tmp.scsUrl, params).then(function (response) {
                    let res = Web3EthAbi.decodeParameter('uint256', response.data.result);
                    resolve(res);
                }).catch(function (error) {
                    reject(error);
                });
            }
        });
    }

    private static getMoacCfg(): moacCfg {
        let vnodeVia: string;
        let vnodeUrl: string;
        let scsUrl: string;
        if (Array.isArray(Liberum.scsUri) && Liberum.scsUri.length > 0) {
            let random: number = Math.floor(Math.random() * Liberum.scsUri.length)
            vnodeVia = Liberum.vnodeVia[random]
            vnodeUrl = Liberum.vnodeUri[random]
            scsUrl = Liberum.scsUri[random];
        }
        return { vnodeVia: vnodeVia, vnodeUrl: vnodeUrl, scsUrl: scsUrl };
    }
}

export default Liberum;
export { Liberum };