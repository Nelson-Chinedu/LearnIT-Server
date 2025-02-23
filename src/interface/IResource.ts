export interface IResource {
   resourceId: string;
}

export interface IEditResource extends IResource {
  name: string;
  url: string;
  categoryId: string;
}