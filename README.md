# LBR_utils

### Install

npm i lbr_utils

### APIs

#### Usage

```js
    const liberum = require("lbr_utils").Liberum;
    let InitConfig = {
        vnodeUri: 'vnode url',
        scsUri: 'scs url',
        vnodeVia: 'vnode 收益地址',
        pairsAddr: '配置交易对合约地址',
        dappAddr: '交易合约地址',
        subchainAddr: '应用链地址'
    }

    liberum.init(InitConfig);
```

#### getDappInfo

```js
    /**
     * 获取交易合约信息
     */
    public static getDappInfo()
```

#### changeAccountLevelsAddr

```js
    /**
     * 修改账户等级控制合约地址
     * @param  {Account} baseAccount 合约部署者账户
     * @param {address} accountLevelsAddr 修改账户地址
     */
    public static async changeAccountLevelsAddr(baseAccount: Account, accountLevelsAddr: string)
```

#### changeFeeAccount

```js
    /**
     * 修改手续费缴纳账户
     * @param  {Account} baseAccount 合约部署者账户
     * @param {address}  feeAccount 缴费账户
     */
    public static async changeFeeAccount(baseAccount: Account, feeAccount: string)
```

#### changeFeeMake

```js
    /**
     * 修改成交方手续费
     * @param  {Account} baseAccount 合约部署者账户
     * @param {number} feeMake 手续费
     */
    public static async changeFeeMake(baseAccount: Account, feeMake: number)
```

#### changeFeeTake

```js
    /**
     *  修改被成交方手续费
     * @param  {Account} baseAccount 合约部署者账户
     * @param {number} feeTake 修改后被成交方的手续费
     */
    public static async changeFeeTake(baseAccount: Account, feeTake: number)
```

#### changeFeeRebate

```js
    /**
     * 修改回扣值
     * @param  {Account} baseAccount 合约部署者账户
     * @param {number} feeRebate 回扣值
     */
    public static async changeFeeRebate(baseAccount: Account, feeRebate: number)
```

#### deposit

```js
    /**
     * 应用链原生币合约充值
     * @param {Account} account 充值账户
     * @param {number} value 充值数量
     * @param { number } decimal token精度
     */
    public static async deposit(account: Account, value: number)
```

#### withdraw

```js
    /**
     * 应用链原生币合约提币
     * @param {Account} account 提币账户
     * @param {number} value 提币数量
     */
    public static async withdraw(account: Account, value: number)
```

#### depositToken

```js
    /**
     * 应用链token合约充值
     * @param {Account} account 充值账户
     * @param {address} token 充值token地址
     * @param {number} value 充值数量
     * @param { number } decimal token精度
     */
    public static async depositToken(account: Account, token: string, value: number, decimal: number)
```

#### withdrawToken

```js
    /**
     * 应用链token合约提现
     * @param {Account} account 提现账户
     * @param {address} token 提现token地址
     * @param {number}  value 提现数量
     * @param { number } decimal token精度
     */
    public static async withdrawToken(account: Account, token: string, value: number, decimal: number)
```

#### balanceOf

```js
    /**
     * 合约充提余额查询
     * @param {address} token token地址
     * @param {address} address 查询地址
     */
    public static async balanceOf(token: string, address: string, decimal: number)
```

#### createOrder

```js
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
    public static async createOrder(account: Account, tokenGet: string, amountGet: number, tokenGetDecimal: number, tokenGive: string, amountGive: number, tokenGiveDecimal: number, expires: number)
```

#### getAvailableVolume

```js
    /**
     * 获取挂单余额
     * @param {address} tokenGet 挂单获取token地址
     * @param  {number} amountGet 挂单获取token数量
     * @param { number } tokenGetDecimal 挂单获取token精度
     * @param  {address} tokenGive 挂单付出token地址
     * @param  {number} amountGive 挂单付出token数量
     * @param { number } tokenGiveDecimal 挂单付出token精度
     * @param  {address} user 挂单用户地址
     * @param  {number} nonce 挂单时nonce
     * @param  {number} blockNum 挂单时blockNum
     */
    public static getAvailableVolume(tokenGet: string, amountGet: number, tokenGetDecimal: number, tokenGive: string, amountGive: number, tokenGiveDecimal: number, user: string, nonce: number, blockNum: number)
```

#### getAmountFilled

```js
    /**
     * 获取挂单成交额
     * @param  {address} tokenGet 挂单获取token地址
     * @param  {number} amountGet 挂单获取token数量
     * @param { number } tokenGetDecimal 挂单获取token精度
     * @param  {address} tokenGive 挂单付出token地址
     * @param  {number} amountGive 挂单付出token数量
     * @param { number } tokenGiveDecimal 挂单付出token精度
     * @param  {address} user 挂单用户地址
     * @param  {number} nonce 挂单时nonce
     * @param  {number} blockNum 挂单时blockNum
     */
    public static getAmountFilled(tokenGet: string, amountGet: number, tokenGetDecimal: number, tokenGive: string, amountGive: number, tokenGiveDecimal: number, user: string, nonce: number, blockNum: number)
```

#### cancelOrder

```js
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
    public static async cancelOrder(account: Account, tokenGet: string, amountGet: number, tokenGetDecimal: number, tokenGive: string, amountGive: number, tokenGiveDecimal: number, nonce: number, blockNum: number)
```

#### transferERC20

```js
    /**
     * ERC20转账
     * @param fromAccount 发起转账账户
     * @param toAddress 转账目标账户
     * @param tokenAdd 转账Token地址
     * @param amount 转账数量
     * @param tokenDecimal 转账Token精度
     * @param logs 转账备注
     */
    public static async transferERC20(fromAccount: Account, toAddress: string, tokenAdd: string, amount: number, tokenDecimal: number, logs: string)
```

#### transfer

```js
    /**
     * 原生币转账
     * @param fromAccount 发起转账账户
     * @param toAddress 转账目标账户
     * @param amount 转账数量
     * @param logs 转账备注
     */
    public static async transfer(fromAccount: Account, toAddress: string, amount: number, logs: string)
```

#### getType

```js
    /**
     * 获取买卖类型
     * @param tokenGet 获取Token地址
     * @param tokenGive 付出Token地址
     * @param account 操作账户
     */
    public static async getType(tokenGet: string, tokenGive: string)
```

#### addPair

```js
    /**
     * 添加交易对
     * @param base base Token地址
     * @param counter counter Token地址
     * @param baseAccount 合约部署者账户
     */
    public static async addPair(base: string, counter: string, baseAccount: Account)
```

#### removePair

```js
    /**
     * 移除交易对
     * @param base base Token地址
     * @param counter counter Token地址
     * @param baseAccount 合约部署者账户
     */
    public static async removePair(base: string, counter: string, baseAccount: Account)
```

#### changePairAddr

```js
    /**
     * 修改pairs合约地址
     * @param baseAccount 合约部署者账户
     * @param pairAddr 修改后的pairs合约地址
     */
    public static async changePairAddr(baseAccount: Account, pairAddr: string)
```

#### changeFreezeToken

```js
    /**
     * 修改挂单冻结token地址
     * @param baseAccount 合约部署者账户
     * @param newToken 新的冻结币种
     */
    public static async changeFreezeToken(baseAccount: Account, newToken: string)
```
