<?php

class Forum_comments_Model extends MY_Model
{
    function __construct()
    {
        parent::__construct();
        $this->table_name = 'forum_comments';
        $this->primary_key = 'ID';
    }


    public function get_by_id($id, $language)
    {
        $result_set = $this->db->get_where('forum_comments', array('FORUM_ID' => $id));
        return $result_set->result_array();
    }
}
