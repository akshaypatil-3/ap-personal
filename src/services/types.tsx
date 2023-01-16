export type TrackStatus = "IN_PROGRESS" | "NOT_STARTED" | "DONE";
export interface Order {
  orderId: string;
  orderDate: string;
  store: string;
  customer: string;
  quantity: string;
  orderValue: string;
  deliveryDate: string;
  deliveryMode: string;
  status: string;
  trackStatus: string;
}

export interface User {
  userId: string;
  fullName: string;
}

export interface ProductSummary {
  productId: string;
  storeId: number;
  productName: string;
  productAvailability: string;
  identity: string;
  quantity: string;
  uom: string;
  weight: string;
  price: string;
  disconut: string;
  total: string;
  substitutedItems: string;
  isAlcohol: boolean;
  ageRestricted: boolean;
  EBT: boolean;
  pickedQuantity: string;
}
interface Address {
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  landmark: string;
}
export interface PaymentDetailsType {
  orderId: string;
  date: string;
  gateway: string;
  transactionId: string;
  state: string;
  amount: string;
}

export interface CustomerDetailsType extends Address {
  orderId: string;
  name: string;
  email: string;
  payment: string;
}

export interface OrderDetailsType {
  orderId: string;
  orderCreatedDate: string;
  deliveryMode: string;
  deliveryDate: string;
  note: string;
  payment: string;
  subTotal: string;
  totalDiscount: string;
  tax: string;
  totalPayable: string;
}

export interface TimelineDetailsType {
  orderId: string;
  trackNumber: string;
  deliveryAddress: DeliveryAddressType;
  deliveryPartner: string;
  tracks: [];
}

export interface TrackType {
  track: string;
  trackStatus: TrackStatus;
  processDateTime: string;
  delayMessage?: string;
  moreDetails?: string;
}

export interface DeliveryAddressType extends Address {}
