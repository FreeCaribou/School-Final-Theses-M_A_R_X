using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace VeryNewMarx.Schema
{
    class CreateRelationshipTypeSchema
    {
        [JsonProperty("name", Required = Required.Always)]
        public string Name;
    }
}
