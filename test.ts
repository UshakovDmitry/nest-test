export interface TransportRequestData {
    _id: string;
    Number: string;
    Date: string;
    Organization: string;
    DocumentStatus: string;
    Driver: string;
    ISR: string;
    Informal_Document: string;
    SKU_Weight: string;
    ArrayStrings: ProductItemData[];
    ContactInformation: ContactInformationData;
}


export interface ProductItemData {
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


export interface ContactInformationData {
    City: string;
    Delivery_Condition: string;
    Date_Time_delivery: string;
    Time_Window: string;
    Latitude: string;
    Longitude: string;
    Street: string;
    Home: string;
    Phone: string;
    Apartment: string;
    Contractor: string;
    _id: string;
}



///


class ProductItem {
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



class TransportRequest {
    id: string;
    number: string;
    date: Date;
    organization: string;
    documentStatus: string;
    driver: string;
    ISR: string;
    informalDocument: string;
    skuWeight: number;
    products: ProductItem[];
    contactInformation: ContactInformation;

    constructor(data: any) {
        this.id = data._id;
        this.number = data.Number;
        this.date = new Date(data.Date);
        this.organization = data.Organization;
        this.documentStatus = data.DocumentStatus;
        this.driver = data.Driver;
        this.ISR = data.ISR;
        this.informalDocument = data.Informal_Document;
        this.skuWeight = parseInt(data.SKU_Weight, 10);
        this.products = data.ArrayStrings.map((item: any) => new ProductItem(item));
        this.contactInformation = new ContactInformation(data.ContactInformation);
    }
}







class ContactInformation {
    city: string;
    deliveryCondition: string;
    dateTimeDelivery: string;
    timeWindow: string;
    latitude: number;
    longitude: number;
    street: string;
    home: string;
    phone: string;
    apartment: string;
    contractor: string;
    id: string;

    constructor(data: any) {
        this.city = data.City;
        this.deliveryCondition = data.Delivery_Condition;
        this.dateTimeDelivery = data.Date_Time_delivery;
        this.timeWindow = data.Time_Window;
        this.latitude = parseFloat(data.Latitude.replace(',', '.'));
        this.longitude = parseFloat(data.Longitude.replace(',', '.'));
        this.street = data.Street;
        this.home = data.Home;
        this.phone = data.Phone;
        this.apartment = data.Apartment;
        this.contractor = data.Contractor;
        this.id = data._id;
    }
}
