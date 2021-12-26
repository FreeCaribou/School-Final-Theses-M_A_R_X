using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using VeryNewMarx.Models;
using VeryNewMarx.Services;
using VeryNewMarx.Views;
using Xamarin.Forms;

namespace VeryNewMarx.ViewModels
{
    public class NewRelationshipViewModel : BaseViewModel
    {
        public ObservableCollection<UserRelationshipType> RelaType { get; set; }
        public Command LoadRelaTypeCommand { get; set; }
        public Command Post { get; set; }
        public UserRelationshipTypeService userRelationshipTypeService;
        public UserRelationshipType SelectedRelationship { get; set; }
        public string Name { get; set; }

        public NewRelationshipViewModel()
        {
            Title = "New relationship";
            RelaType = new ObservableCollection<UserRelationshipType>();
            userRelationshipTypeService = new UserRelationshipTypeService();
            LoadRelaTypeCommand = new Command(async () => await ExecuteLoadItemsCommand());
            Post = new Command(async () => await PostRelationship());
        }

        public async Task PostRelationship()
        {
            await userRelationshipTypeService.PostRelationship(Name, SelectedRelationship.Id);
        }

        async Task ExecuteLoadItemsCommand()
        {
            if (IsBusy)
                return;
            IsBusy = true;

            try
            {
                RelaType.Clear();
                var items = await userRelationshipTypeService.GetMyRelationshipType();

                foreach (var item in items)
                {
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
