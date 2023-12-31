// import DataTable from 'datatables.net-dt';

const URL = "http://localhost:8000";

const tbody = $("#tbody");

function displayAllBooking(bookings) {
  let tab = ``;

  bookings.forEach((booking) => {
    let status =
      '<div class="actions"> <a href="#" class="btn btn-sm bg-warning-light mr-2">Pending</a> </div>';
    if (booking.is_cancelled == false) {
      status =
        '<div class="actions"> <a href="#" class="btn btn-sm bg-success-light mr-2">Arrived</a> </div>';
    } else if (booking.is_cancelled == true) {
      status =
        '<div class="actions"> <a href="#" class="btn btn-sm bg-danger-light mr-2">Cancelled</a> </div>';
    }
      tbody.append(`
        <tr>
          <td>BKG-${booking.id}</td>
          <td>
            <h2 class="table-avatar">
              <a href="profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="../assets/img/profiles/avatar-03.jpg" alt="User Image"></a>
              <a href="profile.html">${booking.customer_firstname} ${booking.customer_lastname}<span>#${booking.id_customer}</span></a>
              </h2>
          </td>
          <td>${booking.room_type}</td>
          <td>${booking.number_of_person}</td>
          <td>${booking.date_arrived.split('').slice(0, 10).join('')}</td>
          <td>${booking.leaving_date.split('').slice(0, 10).join('')}</td>
          <td>${booking.email}</td>
          <td>${booking.principal_contact}</td>
          <td>
            ${status}
          </td>
          <td class="text-right">
            <div class="dropdown dropdown-action"> <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v ellipse_color"></i></a>
              <div class="dropdown-menu dropdown-menu-right"> 
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#edit_asset_${booking.id}"><i class="fas fa-pencil-alt m-r-5"></i> Edit</a>
                <!--<a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_asset_${booking.id}"><i class="fas fa-trash-alt m-r-5"></i> Delete</a>-->
              </div>
            </div>

            <div id="delete_asset_${booking.id}" class="modal fade delete-modal" role="dialog">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center"> <img src="../assets/img/sent.png" alt="" width="50" height="46">
                      <h3 class="delete_class">Are you sure want to delete this Booking</h3>
                      <div class="m-t-20"> <a href="#" class="btn btn-white" data-dismiss="modal">Close</a>
                        <button type="submit" class="btn btn-danger">Delete</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
              
            <div id="edit_asset_${booking.id}" class="modal fade delete-modal" role="dialog">
              <div class="modal-dialog modal-dialog-centered modal-lg h-100">
                <div class="modal-content">
                    <div class="modal-body text-center h-100">
                      <form class="w-100" onSubmit={updateBooking(${booking.id})} >
                        <h3 class="">Edit Booking</h3>
                        <div class="row formtype">
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="number_${booking.id}">Room Number</label>
                              <input type="text" class="form-control" id="number_${booking.id}">
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="capacity_room_${booking.id}">Total Members</label>
                              <input type="number" class="form-control" id="capacity_room_${booking.id}">
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="status_${booking.id}">Status </label>
                                <select id="status_${booking.id}" class="form-control">
                                  <option></option>
                                  <option value="false" >Arrived</option>
                                  <option value="true" >Cancelled</option>
                                  <option value="null" >Pending</option>
                                </select>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="arrival_date_${booking.id}">Arrival Date</label>
                                <input type="datetime-local" id="arrival_date_${booking.id}" class="form-control">
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label for="departure_date_${booking.id}">Depature Date</label>
                                <input type="datetime-local" id="departure_date_${booking.id}" class="form-control">
                            </div>
                          </div>
                        </div>
                        <div class="m-t-20 d-flex justify-content-around">
                            <a href="#" class="btn btn-white" data-dismiss="modal">Close</a>
                            <button type="submit" class="btn btn-warning">Edit</button>
                        </div>
                      </form>
                      
                    </div>
                </div>
              </div>
            </div>

          </td>
        </tr>
        `);
    })
    $(document).ready(function () {
      $('#myTable').DataTable();
    });
}

fetch(`${URL}/ReservationsWithCustomerInfo`)
  .then((res) => res.json())
  .then((data) => {
    displayAllBooking(data);
  });

function updateBooking(id) {
  let status = document.getElementById(`status_${id}`).value;  
  status == "null" ? status = null : null;

  fetch(`${URL}/reservation/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number: document.getElementById(`number_${id}`).value,
      arrival_date: document.getElementById(`arrival_date_${id}`).value,
      departure_date: document.getElementById(`departure_date_${id}`).value,
      is_cancelled: status,
    }),
  }).then((res) => res);
}
  