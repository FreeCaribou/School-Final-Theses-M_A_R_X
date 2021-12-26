using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;
using VeryNewMarx.Models;
using VeryNewMarx.Services;
using VeryNewMarx.Views;
using Xamarin.Forms;

namespace VeryNewMarx.ViewModels
{
    public class RelationshipTypeViewModel : BaseViewModel
    {
        public ObservableCollection<Relationship> RelaType { get; set; }
        public Command LoadRelaTypeCommand { get; set; }
        public UserRelationshipTypeService userRelationshipTypeService;

        public RelationshipTypeViewModel()
        {
            Title = "Relationship";
            RelaType = new ObservableCollection<Relationship>();
            userRelationshipTypeService = new UserRelationshipTypeService();
            LoadRelaTypeCommand = new Command(async () => await ExecuteLoadItemsCommand());

            MessagingCenter.Subscribe<NewRelationshipTypePage, string>(this, "AddRelationshipType", async (obj, relationshipType) =>
            {
                await userRelationshipTypeService.PostRelationshipType(relationshipType);
            });
        }

        async Task ExecuteLoadItemsCommand()
        {
            if (IsBusy)
                return;
            IsBusy = true;

            try
            {
                RelaType.Clear();
                var items = await userRelationshipTypeService.GetMyRelationship();

                foreach (var item in items)
                {
                    Debug.WriteLine(item.Id);
                    RelaType.Add(item);
                }
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
