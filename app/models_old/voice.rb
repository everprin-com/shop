class Voice < ActiveRecord::Base
  belongs_to :film

  def self.change_voice(vote_flag, param1, increase_id, current_user, role)
    if Voice.where(voter_id: current_user).where(votable_type: param1).where(votable_id: increase_id).where(vote_flag: vote_flag).present?
      nil
    elsif
      if Voice.where(voter_id: current_user).where(votable_type: param1).where(votable_id: increase_id).present?
        voice_up = Voice.where(voter_id: current_user).where(votable_type: param1).find_by_votable_id(increase_id)
        voice_up.update_attribute(:vote_flag, vote_flag)
        voice_up.save
      end
    elsif
      Voice.where(votable_type: param1).where(votable_id: increase_id).find_by_vote_flag(vote_flag).present?
      voice_down = Voice.where(votable_type: param1).where(votable_id: increase_id).where(vote_flag: vote_flag)
      voice_down.update_attribute(:sum_voices, a.sum_voices + 1)
      voice_down.save
    elsif
      voice = Voice.create(vote_flag: vote_flag, votable_type: param1, votable_id: increase_id, voter_id: current_user, voter_type: role)
      voice.save
    end
  end
end
