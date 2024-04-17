import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';



import HttpService from '../components/HttpService';
import DietaryItem from '../components/DietaryItem';

const httpService = new HttpService();




function DietarydDetailPage() {
    
  const { dietary } = useRouteLoaderData('dietary-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={dietary}>
          {(loadedDietaryRecipe) => <DietaryItem dietary={loadedDietaryRecipe} />}
        </Await>
      </Suspense>
    </>
  );
}

export default DietarydDetailPage;

async function loadDietarydDetails(id) {

  const API_HOST = process.env.REACT_APP_API_URL;
  const url = API_HOST+"/api/dietaries/"+id;
  console.log(url);
  const response = await httpService.get(url,null);
  console.log(response);
  console.log(response.name);
  return response;

}



export async function loader({ request, params }) {
    const id = params.dietaryId;
  
    return defer({
        dietary: await loadDietarydDetails(id),
    });
  }
  


