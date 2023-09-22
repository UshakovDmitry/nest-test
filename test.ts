
import { IProductItem } from "../interfaces/ProductItem.interface";

export class ProductItem implements IProductItem{
    shippingPoint: string;
    goods: string;
    quantity: number;
    itemStatus: string;
    pickupPoint: string;
    deliveryPoint: string;
    pickupLatitude: number;
    pickupLongitude: number;
    deliveryLatitude: number;
    deliveryLongitude: number;
    pickupTime: Date;
    deliveryTime: Date;

    constructor(data: any) {
        this.shippingPoint = data.Shipping_Point;
        this.goods = data.Goods;
        this.quantity = parseInt(data.Quantity, 10);
        this.itemStatus = data.Item_Status;
        this.pickupPoint = data.Pickup_Point;
        this.deliveryPoint = data.Delivery_Point;
        this.pickupLatitude = parseFloat(data.Pickup_Latitude.replace(',', '.'));
        this.pickupLongitude = parseFloat(data.Pickup_Longitude.replace(',', '.'));
        this.deliveryLatitude = parseFloat(data.Delivery_Latitude.replace(',', '.'));
        this.deliveryLongitude = parseFloat(data.Delivery_Longitude.replace(',', '.'));
        this.pickupTime = new Date(data.Pickup_Time);
        this.deliveryTime = new Date(data.Delivery_Time);
    }
}


export interface IProductItem {
    Shipping_Point: string;
    Goods: string;
    Quantity: string;
    Item_Status: string;
    Pickup_Point: string;
    Delivery_Point: string;
    Pickup_Latitude: string;
    Pickup_Longitude: string;
    Delivery_Latitude: string;
    Delivery_Longitude: string;
    Pickup_Time: string;
    Delivery_Time: string;
}

Class 'ProductItem' incorrectly implements interface 'IProductItem'.
  Type 'ProductItem' is missing the following properties from type 'IProductItem': Shipping_Point, Goods, Quantity, Item_Status, and 8 more.ts(2420)
class ProductItem
