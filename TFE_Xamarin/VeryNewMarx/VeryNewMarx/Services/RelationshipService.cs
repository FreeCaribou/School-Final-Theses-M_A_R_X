using Newtonsoft.Json;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using VeryMarx.Services;
using VeryNewMarx.Models;
using VeryNewMarx.Schema;

namespace VeryNewMarx.Services
{
    public class UserRelationshipTypeService
    {
        public static string BaseURL = "userRelationshipTypes";

        public BaseService baseService;

        public UserRelationshipTypeService()
        {
            baseService = new BaseService();
        }

        public Task<IEnumerable<UserRelationshipType>> GetMyRelationshipType()
        {
            return baseService.Get<IEnumerable<UserRelationshipType>>("userRelationshipTypes");
        }

        public Task<IEnumerable<Relationship>> GetMyRelationship()
        {
            return baseService.Get<IEnumerable<Relationship>>("Relationships");
        }

        public Task<Relationship> GetOneRelationship(int id)
        {
            return baseService.Get<Relationship>("Relationships/" + id);
        }

        public Task PostRelationshipType(string name)
        {            
            CreateRelationshipTypeSchema n = new CreateRelationshipTypeSchema();
            n.Name = name;
            return baseService.Post<UserRelationshipType>("relationshipTypes", JsonConvert.SerializeObject(n));
        }

        public Task PostRelationship(string name, int userRelationshipTypeId)
        {
            CreateRelationshipSchema n = new CreateRelationshipSchema();
            n.Name = name;
            n.UserRelationshipTypeId = userRelationshipTypeId;
            return baseService.Post<Relationship>("relationships", JsonConvert.SerializeObject(n));
        }

    }
}
