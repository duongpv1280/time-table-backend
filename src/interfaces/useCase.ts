export default interface IUseCase<T> {
  execute(...args: unknown[]): Promise<T>
}