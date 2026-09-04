import connect from "../db/connect";

export default async function TestDB() {
  try {
    await connect();

    return <h1>MongoDB connected successfully!</h1>;
  } catch (error) {
    console.error(error);

    return <h1>MongoDB connection failed!</h1>;
  }
}