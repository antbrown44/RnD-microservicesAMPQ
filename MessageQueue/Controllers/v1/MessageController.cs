using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MessageQueue.Data.Entities;
using MessageQueue.Models.v1;
using MessageQueue.Service.v1.Command;
using MessageQueue.Service.v1.Query;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MessageQueue.Messaging.Send.Sender.v1;
using MessageQueue.Messaging.Send.Options.v1;
using RabbitMQ.Client;
using MessageQueue.Messaging.Send.Receiver;
using Newtonsoft.Json;

namespace MessageQueue.Controllers.v1
{
    [Produces("application/json")]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IMessageSender _messageSender;

        public MessageController(IMapper mapper, IMediator mediator, IMessageSender messageSender)
        {
            _mapper = mapper;
            _mediator = mediator;
            _messageSender = messageSender;
        }

        /// <summary>
        /// Action to get all messages from DB.
        /// </summary>
        /// <returns>Returns a list of all messages in DB</returns>
        /// <response code="200">Returned if the messages were loaded</response>
        /// <response code="400">Returned if the messages couldn't be loaded</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet]
        public async Task<ActionResult<List<Message>>> Messages()
        {
            try
            {
                return await _mediator.Send(new GetMessageQuery());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Action to consume a messages via broker.
        /// </summary>
        /// <returns>Returns a messages</returns>
        /// <response code="200">Returned if the message were loaded</response>
        /// <response code="400">Returned if the message couldn't be loaded</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpGet("broker")]
        public ActionResult<List<Message>> GetMessages([FromQuery] string QName)
        {
            Message msg;
            try
            {
                msg = _messageSender.GetMessage(QName);
            }
            catch (Exception ex)
            {
                return BadRequest($"No messages found in queue '{QName}' - Error: " + ex.Message);
            }
            return Ok(msg);
        }

        /// <summary>
        /// Action to delete a queue from broker (queue must be empty).
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Returned if queue was deleted</response>
        /// <response code="400">Returned if the queue couldn't be deleted</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpDelete("delete")]
        public ActionResult<List<string>> DeleteQueue([FromQuery] string QName)
        {
            bool isDeleted;
            try
            {
                isDeleted = _messageSender.DeleteQueue(QName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(isDeleted);
        }

        /// <summary>
        /// Action to purge all messages in a queue.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Returned if purged</response>
        /// <response code="400">Returned if the queue couldn't be purged</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpDelete("purge")]
        public ActionResult<List<string>> PurgeQueue([FromQuery] string QName)
        {
            bool isDeleted;
            try
            {
                isDeleted = _messageSender.PurgeQueue(QName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(isDeleted);
        }

        /// <summary>
        /// Action to publish a new message to a new or existing queue.
        /// </summary>
        /// <param name="createMessageModel">Model to create a new message</param>
        /// <returns></returns>
        /// <response code="200">Returned if the message was created</response>
        /// <response code="400">Returned if the model couldn't be parsed or the message couldn't be saved</response>
        /// <response code="422">Returned when the validation failed</response>
        //[ApiExplorerSettings(IgnoreApi = true)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [HttpPost]
        public async Task<ActionResult<Message>> SendMessage(CreateMessageModel createMessageModel)
        {
            try
            {
                var msg = new Message()
                {
                    QueueName =  createMessageModel.QueueName,
                    Target = createMessageModel.Target,
                    Row = createMessageModel.Row
                 };
                 _messageSender.SendMessage(msg);

                //-- save message in db
                //return await _mediator.Send(new CreateMessageCommand
                //{
                //    Message = _mapper.Map<Message>(msg)
                //});
                return Ok(msg);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Action to update message.
        /// </summary>
        /// <param name="updateMessageModel">Model to update an existing message.</param>
        /// <returns>Returns the updated message</returns>
        /// <response code="200">Returned if the message was updated</response>
        /// <response code="400">Returned if the model couldn't be parsed or the message couldn't be found</response>
        /// <response code="422">Returned when the validation failed</response>
        [ApiExplorerSettings(IgnoreApi = true)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [HttpPut]
        public async Task<ActionResult<Message>> Message(UpdateMessageModel updateMessageModel)
        {
            try
            {
                var message = await _mediator.Send(new GetMessageByIdQuery
                {
                    Id = updateMessageModel.Row
                });

                if (message == null)
                {
                    return BadRequest($"No message found with the id {updateMessageModel.Row}");
                }

                return await _mediator.Send(new UpdateMessageCommand
                {
                    Message = _mapper.Map(updateMessageModel, message)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}