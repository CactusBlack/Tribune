<template>
    <div class="container">
        <div class="row mt-3">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">User Table</h3>

                <div class="card-tools">
                  <button class="btn btn-success" data-toggle="modal" data-target="#addNew">Add new 
                      <i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Date Registered</th>
                        <th>Modify</th>
                  </tr>
                  <tr v-for="user in users" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.type|upText}}</td>
                    <td>{{user.created_at|date}}</td>
                
                    <td>
                        <a href="#">Edit 
                            <i class="fa fa-edit"></i>
                        </a>
                    /
                         <a href="#" @click="deleteUser(user.id)">Delete 
                            <i class="fa fa-trash red"></i>
                        </a>
                    </td>
                  </tr>
                </tbody></table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>

        <!-- modal -->

                    <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addNewLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="addUser">
                <div class="modal-body">

                    <div class="form-group">
                    
                                <input v-model="form.name" type="text" name="name"
                                placeholder="Name"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                            <has-error :form="form" field="name"></has-error>
                      </div>
                       <div class="form-group">
                    
                                <input v-model="form.email" type="text" name="email"
                                placeholder="Email Address"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                            <has-error :form="form" field="email"></has-error>
                      </div>

                       <div class="form-group">
                    
                         <textarea v-model="form.bio" type="text" name="bio"
                         placeholder="Tell us something about yourself(Optional)"
                              class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                                     <has-error :form="form" field="bio"></has-error>
                      </div>

                     <div class="form-group">
                        <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                            <option value="">Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">Standard User</option>
                            <option value="author">Author</option>
                        </select>
                        <has-error :form="form" field="type"></has-error>
                    </div>

                     <div class="form-group">
                        <input v-model="form.password" type="password" name="password" id="password"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                    </div>
    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Create</button>
                </div>
                </form>
                </div>
            </div>
            </div>
    </div>
</template>

<script>
import { setInterval } from 'timers';
    export default {
        data(){
            return{
              users:{},

                form: new Form({
                    name:'',
                    email:'',
                    password:'',
                    type:'',
                    bio:'',
                    photo:''
                })

            }
        },
        methods:{

          deleteUser(id){

            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              // send ajax request to server
              if (result.value){
                this.form.delete('api/user/'+id).then(()=>{
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                    fire.$emit('Cafter');

                }).catch(()=>{
                  swal("failed!", "Not sure why that happned.","warning");
                });
                 

              }

                
            })

          },

          addUser(){
            this.$Progress.start();
             this.form.post('api/user')
             .then(()=>{

                 fire.$emit('Cafter');
             $('#addNew').modal('hide');

                          toast.fire({
                type: 'success',
                title: 'User successfully created'
              })
                    this.$Progress.finish();

             })

             .catch(()=>{

             })
           
          },

          loadUser(){
            axios.get("api/user").then(({ data }) => (this.users = data.data));

          }

        },
        mounted() {
           this.loadUser();
           fire.$on('Cafter',()=>{this.loadUser()});
           //setInterval(()=>this.loadUser(),3000);
        }
    }
</script>
