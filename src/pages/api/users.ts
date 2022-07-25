import {NextApiRequest, NextApiResponse} from 'next';
export default function(request: NextApiRequest, response: NextApiResponse){
   const users = [
    {id: 1, name: 'Luis'},
    {id: 2, name: 'Lola'},
    {id: 3, name: 'Aparecida'},
   ];

   return response.json(users)
}