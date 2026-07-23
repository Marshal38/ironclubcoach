import supabase from "./supabase";


export async function getCoaches() {
  
  const { data, error } = await supabase
  .from('coach')
  .select('*')

  
  if(error) {
    console.error(error)
    throw new Error("Тренеры не найдены")
  }

  return data
}

