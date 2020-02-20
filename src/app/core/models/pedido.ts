export interface Pedido {
    id_pedido?: number;
    codigo_pedido?: string;
    id_estado?: number;
    fecha_pedido?: Date;
    hora_inicio_pedido?: Date;
    hora_estimada_entrega_pedido?: Date;
    hora_entrega_pedido?: Date;
    id_mesa?: number;
    id_menu?: number;
    id_mozo?: number;
    id_empleado?: number;
    nombre_cliente?: string;
}