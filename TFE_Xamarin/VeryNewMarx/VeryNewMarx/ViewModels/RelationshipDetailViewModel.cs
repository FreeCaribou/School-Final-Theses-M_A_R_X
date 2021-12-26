using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using VeryNewMarx.Models;
using VeryNewMarx.Services;
using Xamarin.Forms;

namespace VeryNewMarx.ViewModels
{
    public class RelationshipDetailViewModel : BaseViewModel
    {
        public int Id { get; set; }
        Relationship relationship;
        public Relationship Relationship {
            get { return relationship; }
            set { SetProperty(ref relationship, value); }
        }
        public Command LoadItemCommand { get; set; }
        public UserRelationshipTypeService userRelationshipTypeService;

        public RelationshipDetailViewModel(int id)
        {
            Title = "Details";
            Relationship = new Relationship();
            Relationship.Name = "test";
            Id = id;
            userRelationshipTypeService = new UserRelationshipTypeService();
            LoadItemCommand = new Command(async () => await ExecuteLoadItemsCommand());
        }

        async Task ExecuteLoadItemsCommand()
        {
            if (IsBusy)
                return;
            IsBusy = true;

            try
            {
                var items = await userRelationshipTypeService.GetOneRelationship(Id);
                Relationship = items as Relationship;
                Debug.WriteLine(Relationship.Name);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
            finally
            {
                IsBusy = false;
            }
        }
    }
}
