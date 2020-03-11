export interface Pedido {
    id_pedidos?: number;
    codigo_pedido?: string;
    id_estado?: number;
    fecha_pedido?: string;
    hora_inicio_pedido?: string;
    hora_estimada_entrega_pedido?: string;
    hora_entrega_pedido?: string;
    id_mesa?: number;
    id_menu?: number;
    id_mozo?: number;
    id_empleado?: number;
    nombre_cliente?: string;
    id_tipo_menu?: number;
    nombre_menu?: string;
    descripcion_estado?: string;
    precio_menu?: string;
}
