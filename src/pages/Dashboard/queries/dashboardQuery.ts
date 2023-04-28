import { IFormParams } from '../types';

export const REQUEST_DASHBOARD_BODY = (page: number, form: IFormParams) => {
  return `query {
  characters(page:${page},  filter:{status: "${form.status}", name: "${form.name}"}) {  
   info {
     pages
   },
   results {
     name,
     status,
     species,
     location {
       name
     },
     image,
     episode {
      id, 
      name
    }
   } 
 }
}
`;
};
