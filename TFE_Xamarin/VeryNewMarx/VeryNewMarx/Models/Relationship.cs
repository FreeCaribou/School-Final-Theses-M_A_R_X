using System;
using System.Collections.Generic;
using System.Text;

namespace VeryNewMarx.Models
{
    public class Relationship
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public UserRelationshipType UserRelationshipType { get; set; }
    }
}
