# BowtieGo Medical Network
#### Frontend_Take_Home_Assessment
###### (Kiarash Fereiduni)

##### Choice of Package
- "@material-ui/core", "@material-ui/lab": I used Material Design because it has the best practices of user interface design and helped me to save time and focusing more on structure 
- "@material-ui/icons": I decided to choose Material Icon because it has good quality and it was more compatible with Material Design System
- "typescript": I guess no need to explain. typescript is the best

##### Potential Improvement:
If I had more time probably, I was adding more filtering methods such as search input, price range, and time picker. also, made some improvement on user interface and create a more efferent user experience for filtering

##### Production consideration:
node module installation command and run the project

##### Assumptions:
- I created a JSON file from CSV because I wanted to prevent more complexity in the business logic
- in the objective of the task mentioned we don't need to work on i18n. I decided to remove the Chinese field from the final interface
- splitting service type by `/` to have string array
- merge sequences from 1 to 4 with days and time in the same array (split and replace days, replacing the different separator characters from times string)
- create an array list of areas that include the region with locations
