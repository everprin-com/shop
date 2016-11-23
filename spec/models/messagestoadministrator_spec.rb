require 'rails_helper'


describe Messagestoadministrator do
	it { is_expected.to validate_presence_of(:message) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:name) }
end