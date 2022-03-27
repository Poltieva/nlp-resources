class Resource < ApplicationRecord
  enum type: {
    book: 0,
    video: 1,
    course: 2
  }, _prefix: true

  validates_presence_of :name, :type
end
