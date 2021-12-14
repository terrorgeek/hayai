# Hayai README

Commands(cmd + shift + P), order matters:
1, setup project
  What is does?
  Using yarn to create required npm modules and do pod install in 'ios' folder and create Constants.js file
2, create a module (using Codex)
  What it does?
  Create module based on what the app is doing.
  There are several ways to create module, basically you can just type in a prompt and Codex will figure out what module name and necessary states you need. Hayai will create all modules and necessary folder and files under 'src' folder.

  (1): Create a class called User and with states firstName, gender, dob, lastCheckedIn.
       Then Codex will identify 'User' as module name and firstName, gender, dob, lastCheckedIn as React states.
       Also, if your state name includes some special meaning like date/time related words like "dob", "...time...", "...date...", or others like options related like "gender", "weekdays" or so. Hayai will automatically generate corresponding picker and items for you.
       For example, gender will give you "Male"/"Female", "weekdays" will give you "Sun, Mon, Tue...".

  (2): Create a module called User and with states firstName, gender, dob and insurance-picker-primary-secondary.
       Even if the prompt is different with (1), thanks to Codex, it can still identify the class/module name 'User', and notice this time we have "insurance-picker-primary-secondary", Hayai will take 1st thing in the dash chain as state name, 2nd as field type and the rest as options, as this case is 'picker', all available field types are: "picker", "radio", "checkbox".
       Basically if you make the state name dash separated, Hayai will know that you want a specific picker with your won choices of options.
        

3, make project as:
  (1): make project as drawer
    This will automatically read all folders and thinks them as modules and reconstruct them as drawers.
  (2): make project as tabs
  (3): make project as grid