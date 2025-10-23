
export class Observable<T> {
  private observers: Array<(data: T) => void> = [];

  suscribir(observer: (data: T) => void): void {
    this.observers.push(observer);
  }

  desuscribir(observer: (data: T) => void): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notificar(data: T): void {
    for (const observer of this.observers) {
      observer(data);
    }
  }
}
