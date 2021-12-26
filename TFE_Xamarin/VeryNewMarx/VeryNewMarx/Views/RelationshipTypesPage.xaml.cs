using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using VeryNewMarx.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Collections.Generic;
using System.Text;
using VeryNewMarx.Models;
using VeryNewMarx.Views;

namespace VeryNewMarx.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class RelationshipTypesPage : ContentPage
    {
        public ObservableCollection<string> Items { get; set; }

        RelationshipTypeViewModel viewModel;

        public RelationshipTypesPage()
        {
            InitializeComponent();

            BindingContext = viewModel = new RelationshipTypeViewModel();
        }

        void NewRelationshipType_Button_Clicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new NewRelationshipTypePage());
        }

        async void Handle_ItemTapped(object sender, ItemTappedEventArgs e)
        {
            if (e.Item == null)
                return;

            Relationship selected = e.Item as Relationship;

            await Navigation.PushAsync(new RelationshipDetail(new RelationshipDetailViewModel(selected.Id)));

            //Deselect Item
            ((ListView)sender).SelectedItem = null;
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();

            if (viewModel.RelaType.Count == 0)
            {
                viewModel.LoadRelaTypeCommand.Execute(null);
                MyListView.ItemsSource = viewModel.RelaType;
            }

        }
    }
}
