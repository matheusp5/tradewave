export interface IUseCase<TReq, TRes> {
    execute(request: TReq): TRes
}