using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace VeryNewMarx.Schema
{
    class CreateRelationshipSchema
    {
        [JsonProperty("name", Required = Required.Always)]
        public string Name;
        [JsonProperty("userRelationshipTypeId", Required = Required.Always)]
        public int UserRelationshipTypeId;
    }
}
