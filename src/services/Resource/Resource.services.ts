import { DeleteResult, UpdateResult } from 'typeorm';
import { Resource } from '../../db';

import { AppDataSource } from '../../index';

import { IEditResource, IResource } from '../../interface/IResource';

class ResourceServices {
  async addResource(payload: any) {
    const { name, url, id, categoryId } = payload;

    try {
      const newResource: Resource = AppDataSource.manager.create(Resource, {
        name,
        url,
        profile: id,
        category: categoryId,
      });
      await AppDataSource.manager.save(newResource);
      return newResource;
    } catch (error) {
      throw error;
    }
  }

  async editResource(payload: IEditResource) {
    const { name, url, categoryId, resourceId } = payload;

    try {
      const resource: UpdateResult = await AppDataSource.manager
        .createQueryBuilder()
        .update(Resource)
        .set({ name, url, category: categoryId })
        .where('id = :id', { id: resourceId })
        .execute();
      return resource;
    } catch (error) {
      throw error;
    }
  }

  async deleteResource(payload: IResource) {
    const { resourceId } = payload;

    try {
      const resource: DeleteResult = await AppDataSource.manager
        .getRepository(Resource)
        .createQueryBuilder('resource')
        .delete()
        .where('id = :resourceId', { resourceId })
        .execute();
      return resource;
    } catch (error) {
      throw error;
    }
  }

  async getResources(payload: any) {
    const { id, categoryId } = payload;
    try {
      const resources: Resource[] = await AppDataSource.manager
        .getRepository(Resource)
        .createQueryBuilder('resource')
        .leftJoinAndSelect('resource.category', 'category')
        .select(['resource', 'category.id'])
        .where('resource.profile = :id', { id })
        .andWhere('resource.category = :categoryId', {
          categoryId,
        })
        .getMany();
      return resources;
    } catch (error) {
      throw error;
    }
  }

  async getAllResources(id: Express.User | string) {
    try {
      const resources: Resource[] = await AppDataSource.manager
        .getRepository(Resource)
        .createQueryBuilder('resource')
        .where('resource.profile = :id', { id })
        .getMany();
      return resources;
    } catch (error) {
      throw error;
    }
  }
}

export default new ResourceServices();
