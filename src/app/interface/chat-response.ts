export interface Ichart{
          created_at:string;
          editable:boolean;
          sender:string;
          id:string;
          text:string;
          users:{
                    avatar_url:string;
                    id:string;
                    full_name:string;
          }
}