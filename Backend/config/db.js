import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose
    .connect(
      // 'mongodb+srv://om7503:752003@cluster0.ip68e.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0'
      'mongodb+srv://om_doshi:1008@fooddelivery1.kumfaw8.mongodb.net/?appName=FoodDelivery1'
    )
    .then(() =>console.log("DB Connected"));
}