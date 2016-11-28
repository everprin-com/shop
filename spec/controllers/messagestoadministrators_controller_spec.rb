require 'rails_helper'

RSpec.describe MessagestoadministratorsController, type: :controller do
 
  render_views
  login_user
  
  describe "GET #index" do
    it "responds successfully with an HTTP 200 status code" do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
    it "renders the index template" do
      get :index
      expect(response).to render_template("index")
    end
  end

  
  describe "POST #create" do
    context "with valid params" do
   

      it "creates a new message" do
        post :create, messagestoadministrator: attributes_for(:messagestoadministrator)
        expect(Messagestoadministrator.count).to eq(1)
      end
      
      it 'responds with 422' do
        post :create, messagestoadministrator: attributes_for(:messagestoadministrator, email: nil), format: :html
        expect(response).to have_http_status(200)
      end
      
    end
  end

 
end
