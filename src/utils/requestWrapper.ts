


const fetchApi = async(query: any) =>{
    const response = await fetch(`${process.env.NEXT_SANITY_URL}/${query}`);
    const jsonResponse = await response.json();

    return jsonResponse;
}