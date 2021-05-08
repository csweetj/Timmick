if (document.URL.match( /users/ )) {
  
  function chart() {
    // タブメニュー表示
    const StudyMenu = document.getElementById('StudyMenu');
    const RelaxMenu = document.getElementById('RelaxMenu');
    const FitnessMenu = document.getElementById('FitnessMenu');
    const HobbyMenu = document.getElementById('HobbyMenu');
    const Study_timers_chart = document.getElementById('Study_timers_chart');
    const Relax_timers_chart = document.getElementById('Relax_timers_chart');
    const Fitness_timers_chart = document.getElementById('Fitness_timers_chart');
    const Hobby_timers_chart = document.getElementById('Hobby_timers_chart');
    
    StudyMenu.addEventListener('click', (e) => {
      e.preventDefault();
      
      Relax_timers_chart.classList.add('hidden');
      Fitness_timers_chart.classList.add('hidden');
      Hobby_timers_chart.classList.add('hidden');
      
      RelaxMenu.classList.remove('bg-green-500');
      FitnessMenu.classList.remove('bg-red-400');
      HobbyMenu.classList.remove('bg-purple-500');
      
      RelaxMenu.classList.add('text-green-500');
      FitnessMenu.classList.add('text-red-400');
      HobbyMenu.classList.add('text-purple-500');
      
      Study_timers_chart.classList.remove('hidden');
      StudyMenu.classList.remove('text-blue-500');
      StudyMenu.classList.add('bg-blue-500');
      StudyMenu.classList.add('text-white');
    });

    RelaxMenu.addEventListener('click', (e) => {
      e.preventDefault();
      
      Study_timers_chart.classList.add('hidden');
      Fitness_timers_chart.classList.add('hidden');
      Hobby_timers_chart.classList.add('hidden');
      
      StudyMenu.classList.remove('bg-blue-500');
      FitnessMenu.classList.remove('bg-red-400');
      HobbyMenu.classList.remove('bg-purple-500');
      
      StudyMenu.classList.add('text-blue-500');
      FitnessMenu.classList.add('text-red-400');
      HobbyMenu.classList.add('text-purple-500');
      
      Relax_timers_chart.classList.remove('hidden');
      RelaxMenu.classList.remove('text-green-500');
      RelaxMenu.classList.add('bg-green-500');
      RelaxMenu.classList.add('text-white');
    });

    FitnessMenu.addEventListener('click', (e) => {
      e.preventDefault();
      
      Study_timers_chart.classList.add('hidden');
      Relax_timers_chart.classList.add('hidden');
      Hobby_timers_chart.classList.add('hidden');
      
      StudyMenu.classList.remove('bg-blue-500');
      RelaxMenu.classList.remove('bg-green-500');
      HobbyMenu.classList.remove('bg-purple-500');
      
      StudyMenu.classList.add('text-blue-500');
      RelaxMenu.classList.add('text-green-500');
      HobbyMenu.classList.add('text-purple-500');
      
      Fitness_timers_chart.classList.remove('hidden');
      FitnessMenu.classList.remove('text-red-400');
      FitnessMenu.classList.add('bg-red-400');
      FitnessMenu.classList.add('text-white');
    });
    
    HobbyMenu.addEventListener('click', (e) => {
      e.preventDefault();
      
      Study_timers_chart.classList.add('hidden');
      Relax_timers_chart.classList.add('hidden');
      Fitness_timers_chart.classList.add('hidden');
      
      StudyMenu.classList.remove('bg-blue-500');
      RelaxMenu.classList.remove('bg-green-500');
      FitnessMenu.classList.remove('bg-red-400');
      
      StudyMenu.classList.add('text-blue-500');
      RelaxMenu.classList.add('text-green-500');
      FitnessMenu.classList.add('text-red-400');
      
      Hobby_timers_chart.classList.remove('hidden');
      HobbyMenu.classList.remove('text-purple-500');
      HobbyMenu.classList.add('bg-purple-500');
      HobbyMenu.classList.add('text-white');
    });
  }

  window.addEventListener('load', chart)
}