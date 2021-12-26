using System;
using System.Collections.Generic;
using System.Text;

namespace VeryNewMarx.Models
{
    public class UserRelationshipType
    {
        public int Id { get; set; }
        public User User { get; set; }
        public RelationshipType RelationshipType { get; set; }
    }
}
