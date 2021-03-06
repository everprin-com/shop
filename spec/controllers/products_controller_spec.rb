require 'rails_helper'

RSpec.describe ProductsController, type: :controller do
  render_views
  login_user

  describe 'GET #index' do
    it 'responds successfully with an HTTP 200 status code' do
      get :index
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end
    it 'renders the index template' do
      get :index
      expect(response).to render_template('index')
    end
  end

  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates the vehicle' do
        post :create, product: attributes_for(:product)
        expect(Product.count).to eq(1)
      end

      it 'redirects to the "show" action for the new vehicle' do
        post :create, product: attributes_for(:product)
        expect(response).to redirect_to Product.first
      end
    end

    context 'with invalid attributes' do
      it 'does not create the vehicle' do
        post :create, product: attributes_for(:product, price: nil)
        expect(Product.count).to eq(0)
      end

      it 're-renders the "new" view' do
        post :create, product: attributes_for(:product, price: nil)
        expect(response).to render_template :new
      end
    end
  end

  context 'json' do
    context 'with valid attributes' do
      it 'creates the vehicle' do
        post :create, product: attributes_for(:product), format: :json
        expect(Product.count).to eq(1)
      end

      it 'responds with 201' do
        post :create, product: attributes_for(:product), format: :json
        expect(response).to have_http_status(201)
      end
    end

    context 'with invalid attributes' do
      it 'does not create the vehicle' do
        post :create, product: attributes_for(:product, price: nil), format: :json
        expect(Product.count).to eq(0)
      end

      it 'responds with 422' do
        post :create, product: attributes_for(:product, price: nil), format: :json
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'Ed product' do
    # let(:product) {create(:product)}
    # product = create(:product)
    before(:each) do
      @product = FactoryGirl.create(:product)
    end

    # it "finds a specific product" do
    # patch :update, id: @product.id, product: FactoryGirl.attributes_for(:product)
    # expect(assigns(:product)).to eq(@product.id)
    # end
  end
end
