﻿using System;
using System.ComponentModel.DataAnnotations;

namespace MessageQueue.Models.v1
{
    public class UpdateMessageModel
    {
        // public Guid Id { get; set; } = Guid.NewGuid();

        public string QueueName { get; set; }

        public string Target { get; set; }
        public string Row { get; set; }
        //public string User { get; set; }
        //public int IsInternal { get; set; }
        //public string MessageDetails { get; set; }
        //public string Subject { get; set; }
        //public DateTime? CreatedDate { get; set; }
    }
}