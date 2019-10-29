# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|integer|null: false, foreign_key: true|
|password|integer|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :groups through: :groups_users
  has_many :groups_users


##　groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages 
- has_many :users through: :groups_users
  has_many :groups_users



##　messageテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user