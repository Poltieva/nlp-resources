# frozen_string_literal: true

class Resource < ApplicationRecord
  enum medium: {
    book: 0,
    video: 1,
    course: 2
  }, _prefix: true

  validates_presence_of :name, :medium
end
