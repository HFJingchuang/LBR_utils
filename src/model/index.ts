export interface InitConfig {
    vnodeUri: string[],
    scsUri: string[],
    vnodeVia: string[],
    netWork: number,
    baseAddr: string,
    dappAddr: string,
    pairsAddr: string,
    subchainAddr: string,
    timeOut: number
}

export interface Account {
    address: string;
    secret: string;
}

export interface moacCfg {
    vnodeVia: string,
    vnodeUrl: string,
    scsUrl: string
}
