
const BigNumber = require('bignumber.js');
const Web3EthAbi = require('web3-eth-abi');
const Chain3 = require('chain3');
const axios = require("axios");
var fetch = axios.create({ headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });

const chain3 = new Chain3();

// import { dappABI, pairsABI } from './utils/ABIs';
// import { chain3Instance } from './utils/index';
import { InitConfig, Account } from "./model";

class Liberum {
    private static vnodeVia: string;
    private static dappAddr: string;
    private static pairsAddr: string;
    private static subchainaddr: string;
    // private static chain3: any;
    private static scsUri: string;
    private static vnodeUri: string;
    private static netWork: number;
    private static timeOut: number;
    // private static tokenContract: any;
    // private static mcObject: any;
    // private static pairsContract: any;

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
                // chain3 = chain3Instance(InitConfig.vnodeUri, InitConfig.scsUri);
                // Liberum.mcObject = chain3.microchain();
                // Liberum.mcObject.setVnodeAddress(InitConfig.vnodeVia);
                // Liberum.tokenContract = Liberum.mcObject.getDapp(InitConfig.subchainAddr, dappABI, InitConfig.dappAddr);
                // Liberum.pairsContract = Liberum.mcObject.getDapp(InitConfig.subchainAddr, pairsABI, InitConfig.pairsAddr);
            } catch (error) {
                reject(error)
            }
        })
    }

    // /**
    //  * 获取合约信息
    //  */
    // public static getDappInfo() {
    //     try {
    //         let admin = Liberum.tokenContract.owner();
    //         let feeAccount = Liberum.tokenContract.feeAccount();
    //         let accountLevelsAddr = Liberum.tokenContract.accountLevelsAddr();
    //         let feeMake = chain3.fromSha(Liberum.tokenContract.feeMake());
    //         let feeTake = chain3.fromSha(Liberum.tokenContract.feeTake());
    //         let feeRebate = chain3.fromSha(Liberum.tokenContract.feeRebate());
    //         let pairsAddr = Liberum.tokenContract.pairsAddr();
    //         let freezeToken = Liberum.tokenContract.freezeToken();
    //         let freezeAmount = chain3.fromSha(Liberum.tokenContract.freezeAmount());
    //         return {
    //             admin: admin,
    //             feeAccount: feeAccount,
    //             accountLevelsAddr: accountLevelsAddr,
    //             feeMake: feeMake,
    //             feeTake: feeTake,
    //             feeRebate: feeRebate,
    //             pairsAddr: pairsAddr,
    //             freezeToken: freezeToken,
    //             freezeAmount: freezeAmount
    //         }
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // /**
    //  * 修改账户等级控制合约地址
    //  * @param  {Account} baseAccount 合约部署者账户
    //  * @param {address} accountLevelsAddr 修改账户地址
    //  */
    // public static async changeAccountLevelsAddr(baseAccount: Account, accountLevelsAddr: string) {
    //     try {
    //         let data = Liberum.dappAddr + chain3.sha3('changeAccountLevelsAddr(address)').substr(2, 8)
    //             + chain3.encodeParams(['address'], [accountLevelsAddr]);
    //         let res = await Liberum.sendRawTransaction(baseAccount.address, baseAccount.secret, 0, data);
    //         return res;
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // /**
    //  * 修改手续费缴纳账户
    //  * @param  {Account} baseAccount 合约部署者账户
    //  * @param {address}  feeAccount 缴费账户
    //  */
    // public static async changeFeeAccount(baseAccount: Account, feeAccount: string) {
    //     try {
    //         if (chain3.isAddress(feeAccount)) {
    //             let data = Liberum.dappAddr + chain3.sha3('changeFeeAccount(address)').substr(2, 8)
    //                 + chain3.encodeParams(['address'], [feeAccount]);
    //             let res = await Liberum.sendRawTransaction(baseAccount.address, baseAccount.secret, 0, data)
    //             return res;
    //         } else {
    //             throw new Error('invalid address');
    //         }
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // /**
    //  * 修改成交方手续费
    //  * @param  {Account} baseAccount 合约部署者账户
    //  * @param {number} feeMake 手续费
    //  */
    // public static async changeFeeMake(baseAccount: Account, feeMake: number) {
    //     try {
    //         let data = Liberum.dappAddr + chain3.sha3('changeFeeMake(uint256)').substr(2, 8)
    //             + chain3.encodeParams(['address'], [chain3.toSha(feeMake, 'mc')]);
    //         let res = await Liberum.sendRawTransaction(baseAccount.address, baseAccount.secret, 0, data)
    //         return res;
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // /**
    //  *  修改被成交方手续费
    //  * @param  {Account} baseAccount 合约部署者账户
    //  * @param {number} feeTake 修改后被成交方的手续费
    //  */
    // public static async changeFeeTake(baseAccount: Account, feeTake: number) {
    //     try {
    //         let data = Liberum.dappAddr + chain3.sha3('changeFeeTake(uint256)').substr(2, 8)
    //             + chain3.encodeParams(['address'], [chain3.toSha(feeTake, 'mc')]);
    //         let res = await Liberum.sendRawTransaction(baseAccount.address, baseAccount.secret, 0, data)
    //         return res;
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // /**
    //  * 修改回扣值
    //  * @param  {Account} baseAccount 合约部署者账户
    //  * @param {number} feeRebate 回扣值
    //  */
    // public static async changeFeeRebate(baseAccount: Account, feeRebate: number) {
    //     try {
    //         let data = Liberum.dappAddr + chain3.sha3('changeFeeRebate(uint256)').substr(2, 8)
    //             + chain3.encodeParams(['address'], [chain3.toSha(feeRebate, 'mc')]);
    //         let res = await Liberum.sendRawTransaction(baseAccount.address, baseAccount.secret, 0, data)
    //         return res;
    //     } catch (error) {
    //         throw error
    //     }
    // }

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
            let nonce = Liberum.getNonce(Liberum.subchainaddr, account.address);
            let blockNum = chain3.scs.getBlockNumber(Liberum.subchainaddr) + expires;
            let data = Liberum.dappAddr + chain3.sha3('order(address,uint256,address,uint256,uint256,uint256)').substr(2, 8)
                + chain3.encodeParams(['address', 'uint256', 'address', 'uint256', 'uint256', 'uint256'],
                    [tokenGet, new BigNumber(amountGet).multipliedBy(10 ** tokenGetDecimal), tokenGive, new BigNumber(amountGive).multipliedBy(10 ** tokenGiveDecimal), blockNum, nonce]);
            let res = await Liberum.sendRawTransaction(account.address, account.secret, 0, data)
            return { res, nonce, blockNum };
        } catch (error) {
            throw error
        }
    }

    // /**
    //  * 获取挂单余额
    //  * @param {address} tokenGet 挂单获取token地址
    //  * @param  {number} amountGet 挂单获取token数量
    //  * @param { number } tokenGetDecimal 挂单获取token精度
    //  * @param  {address} tokenGive 挂单付出token地址
    //  * @param  {number} amountGive 挂单付出token数量
    //  * @param { number } tokenGiveDecimal 挂单付出token精度
    //  * @param  {address} user 挂单用户地址
    //  * @param  {number} nonce 挂单时nonce
    //  * @param  {number} blockNum 挂单时blockNum
    //  */
    // public static getAvailableVolume(tokenGet: string, amountGet: number, tokenGetDecimal: number, tokenGive: string, amountGive: number, tokenGiveDecimal: number, user: string, nonce: number, blockNum: number) {
    //     try {
    //         let res = Liberum.tokenContract.availableVolume(tokenGet, new BigNumber(amountGet).multipliedBy(10 ** tokenGetDecimal), tokenGive, new BigNumber(amountGive).multipliedBy(10 ** tokenGiveDecimal), blockNum, nonce, user);
    //         return chain3.fromSha(res);
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // /**
    //  * 获取挂单成交额
    //  * @param  {address} tokenGet 挂单获取token地址
    //  * @param  {number} amountGet 挂单获取token数量
    //  * @param { number } tokenGetDecimal 挂单获取token精度
    //  * @param  {address} tokenGive 挂单付出token地址
    //  * @param  {number} amountGive 挂单付出token数量
    //  * @param { number } tokenGiveDecimal 挂单付出token精度
    //  * @param  {address} user 挂单用户地址
    //  * @param  {number} nonce 挂单时nonce
    //  * @param  {number} blockNum 挂单时blockNum
    //  */
    // public static getAmountFilled(tokenGet: string, amountGet: number, tokenGetDecimal: number, tokenGive: string, amountGive: number, tokenGiveDecimal: number, user: string, nonce: number, blockNum: number) {
    //     try {
    //         let res = Liberum.tokenContract.amountFilled(tokenGet, new BigNumber(amountGet).multipliedBy(10 ** tokenGetDecimal), tokenGive, new BigNumber(amountGive).multipliedBy(10 ** tokenGiveDecimal), blockNum, nonce, user);
    //         return chain3.fromSha(res);
    //     } catch (error) {
    //         throw error
    //     }
    // }

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

    // /**
    //  * 获取买卖类型
    //  * @param tokenGet 获取Token地址
    //  * @param tokenGive 付出Token地址
    //  * @param account 操作账户
    //  */
    // public static async getType(tokenGet: string, tokenGive: string) {
    //     try {
    //         let res = Liberum.pairsContract.getType(tokenGet, tokenGive)
    //         return res;
    //     } catch (error) {
    //         throw error
    //     }
    // }

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
        try {
            let nonce = Liberum.getNonce(Liberum.subchainaddr, from);
            let rawTx = {
                from: from,
                to: Liberum.subchainaddr,
                nonce: chain3.toHex(nonce),
                gasLimit: chain3.toHex("0"),
                gasPrice: chain3.toHex("0"),
                value: chain3.toHex(chain3.toSha(value, 'mc')),
                chainId: chain3.toHex(chain3.version.network),
                via: Liberum.vnodeVia,
                shardingFlag: "0x1",
                data: data
            };
            let signTx = chain3.signTransaction(rawTx, secret);
            let params = JSON.stringify({ "jsonrpc": "2.0", "method": "mc_sendRawTransaction", "params": [signTx], "id": 101 })
            let response = await fetch.post(Liberum.vnodeUri, params);
            let txHash = response.data.result;
            if (txHash) {
                let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getReceiptByHash", "params": [Liberum.subchainaddr, txHash], "id": 101 })
                let i = 0;
                let timer: any;
                let flag: number = Liberum.timeOut / 5000;
                if (flag > i) {
                    timer = setInterval(async () => {
                        i++;
                        let response = await fetch.post(Liberum.scsUri, params);
                        let receipt = response.data.result;
                        if (receipt && !receipt.failed) {
                            return { "result": "success", "hash": txHash };
                        } else if (receipt && receipt.failed) {
                            return { "result": "error", "hash": txHash };
                        }
                    }, 5000)
                } else {
                    clearInterval(timer)
                }
            }
        } catch (error) {
            return { "result": "error", "error": error };
        }
    }

    /**
     * 子链token授权
     * @param account 授权账户
     * @param to 被授权地址
     * @param tokenAdd token地址
     * @param amount 数量
     */
    public static async approve(account: Account, to: string, tokenAdd: string, amount: number, decimal: number) {
        try {
            let nonce = await Liberum.getNonce(Liberum.subchainaddr, account.address);
            let rawTx = {
                from: account.address,
                to: Liberum.subchainaddr,
                nonce: chain3.toHex(nonce),
                gasLimit: chain3.toHex("0"),
                gasPrice: chain3.toHex("0"),
                chainId: chain3.toHex(Liberum.netWork),
                via: Liberum.vnodeVia,
                shardingFlag: "0x1",
                data: tokenAdd + chain3.sha3('approve(address,uint256)').substr(2, 8) +
                    chain3.encodeParams(['address', 'uint256'], [to, new BigNumber(amount).multipliedBy(10 ** decimal)])
            };
            let signTx = chain3.signTransaction(rawTx, account.secret);
            let params = JSON.stringify({ "jsonrpc": "2.0", "method": "mc_sendRawTransaction", "params": [signTx], "id": 101 })
            let response = await fetch.post(Liberum.vnodeUri, params);
            let txHash = response.data.result;
            if (txHash) {
                let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getReceiptByHash", "params": [Liberum.subchainaddr, txHash], "id": 101 })
                let i = 0;
                let timer: any;
                let flag: number = Liberum.timeOut / 5000;
                if (flag > i) {
                    timer = setInterval(async () => {
                        i++;
                        let response = await fetch.post(Liberum.scsUri, params);
                        let receipt = response.data.result;
                        if (receipt && !receipt.failed) {
                            return { "result": "success", "hash": txHash };
                        } else if (receipt && receipt.failed) {
                            return { "result": "error", "hash": txHash };
                        }
                    }, 5000)
                } else {
                    clearInterval(timer)
                }
            }
        } catch (error) {
            return { "result": "error", "error": error };
        }
    }

    private static async getNonce(subchainaddr: string, address: string) {
        return new Promise((resolve, reject) => {
            let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_getNonce", "params": [subchainaddr, address], "id": 101 })
            fetch.post(Liberum.scsUri, params).then(function (response) {
                resolve(response.data.result)
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    private static async getBalance(subchainaddr: string, dappAddr: string, data: any) {
        return new Promise((resolve, reject) => {
            let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": subchainaddr, "dappAddr": dappAddr, "data": data }], "id": 101 })
            fetch.post(Liberum.scsUri, params).then(function (response) {
                let res = Web3EthAbi.decodeParameters([{ type: 'uint256', name: 'balance' }, { type: 'uint256', name: 'freeze' }], response.data.result);
                resolve({ balance: res.balance, freeze: res.freeze })
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    private static async getERC20Balance(subchainaddr: string, token: string, data: any) {
        return new Promise((resolve, reject) => {
            let params = JSON.stringify({ "jsonrpc": "2.0", "method": "scs_directCall", "params": [{ "to": subchainaddr, "dappAddr": token, "data": data }], "id": 101 })
            fetch.post(Liberum.scsUri, params).then(function (response) {
                let res = Web3EthAbi.decodeParameter('uint256', response.data.result);
                resolve(res);
            }).catch(function (error) {
                reject(error);
            });
        });
    }
}

export default Liberum;
export { Liberum };