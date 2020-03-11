import { EstadoEmpleadoPipe } from './estado-empleado.pipe';

describe('EstadoEmpleadoPipe', () => {
  it('create an instance', () => {
    const pipe = new EstadoEmpleadoPipe();
    expect(pipe).toBeTruthy();
  });
});
