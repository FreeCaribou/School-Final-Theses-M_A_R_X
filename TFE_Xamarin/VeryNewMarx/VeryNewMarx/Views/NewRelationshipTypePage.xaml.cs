using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VeryNewMarx.Models;
using VeryNewMarx.ViewModels;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace VeryNewMarx.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class NewRelationshipTypePage : ContentPage
	{
        NewRelationshipViewModel viewModel;

		public NewRelationshipTypePage ()
		{
			InitializeComponent ();
            BindingContext = viewModel = new NewRelationshipViewModel();
        }

        async void Add_Button_Clicked(object sender, EventArgs e)
        {
            Debug.WriteLine(viewModel.Name);
            Debug.WriteLine(viewModel.SelectedRelationship.ToString());
            viewModel.Post.Execute(null);
            await Navigation.PopAsync();
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();

            if (viewModel.RelaType.Count == 0)
            {
                viewModel.LoadRelaTypeCommand.Execute(null);
            }

        }
    }
}