export  interface ProductType {
    id: number;
    name: string;
    price: number;
    sale?:number;
    src:string;
    listColorProduct:{
      title: string;
      price: string;
      src: string;
    }[],
    listTypeProduct:{
      title: string;
      price: string;
    }[],
    listImg:{
      src:string;
      title:string;
    }[]
  }