export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  invalidate(key: string): Promise<void>;
  recover(key: string): Promise<void>;
}
