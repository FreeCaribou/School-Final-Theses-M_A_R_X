using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VeryNewMarx.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace VeryNewMarx.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class RelationshipDetail : ContentPage
    {
        RelationshipDetailViewModel viewModel;
        public RelationshipDetail(RelationshipDetailViewModel viewModel)
        {
            InitializeComponent();
            BindingContext = this.viewModel = viewModel;
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            viewModel.LoadItemCommand.Execute(null);        
        }
    }
}