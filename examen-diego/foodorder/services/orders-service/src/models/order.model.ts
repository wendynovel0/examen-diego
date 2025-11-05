export interface Order {
  id: string;
  mesa: number;
  platillo: string;
  estado: "pendiente" | "en_preparacion" | "listo" | "entregado";
  total: number;
  fecha: string;
}
