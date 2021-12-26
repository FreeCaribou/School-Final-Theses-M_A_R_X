using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
using RestSharp.Authenticators;
using System.Diagnostics;
using Newtonsoft.Json;

namespace VeryMarx.Services
{
    public class BaseService
    {
        // Base URL for emulator
        // public static string BaseURL = "http://10.0.2.2:12345/api/";

        // Base URL for Local
        public static string BaseURL = "http://127.0.0.1:12345/api/";

        public async Task<string> Login()
        {

            return await Task.FromResult("Hello");
        }

        public Task<TReturn> Get<TReturn>(string url) where TReturn : class
        {
            var client = new RestClient(BaseURL);
            var request = new RestRequest(url, Method.GET);
            request.AddHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ3Mzk1NzY3fQ.J-8HOSFvFiCZ9tOZ9jy-Vib211TfMc89_OeZnqTT8PU");

            IRestResponse response = client.Execute(request);

            Debug.WriteLine(response.Content);

            TReturn jsonToSend = JsonConvert.DeserializeObject<TReturn>(response.Content);

            return Task.FromResult(jsonToSend);
        }

        public Task<TReturn> Post<TReturn>(string url, string json) where TReturn : class
        {
            var client = new RestClient(BaseURL);
            var request = new RestRequest(url, Method.POST);
            request.AddHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ3Mzk1NzY3fQ.J-8HOSFvFiCZ9tOZ9jy-Vib211TfMc89_OeZnqTT8PU");

            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);

            Debug.WriteLine(response.Content);

            TReturn jsonToSend = JsonConvert.DeserializeObject<TReturn>(response.Content);

            return Task.FromResult(jsonToSend);
        }

    }
}
