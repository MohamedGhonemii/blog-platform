import os
import site

print("🔍 Looking for django_filters package...")

# Find django_filters package
for path in site.getsitepackages():
    init_file = os.path.join(path, 'django_filters', '__init__.py')
    print(f"Checking: {init_file}")
    
    if os.path.exists(init_file):
        print(f"✅ Found django_filters at: {init_file}")
        
        # Read the file
        with open(init_file, 'r') as f:
            content = f.read()
        
        print("📄 Current content around the problematic line:")
        lines = content.split('\n')
        for i in range(max(0, 5), min(len(lines), 15)):
            print(f"  {i+1}: {lines[i]}")
        
        # Fix the problematic line
        if 'pkgutil.find_loader("rest_framework")' in content:
            print("🛠️  Fixing the pkgutil.find_loader issue...")
            new_content = content.replace(
                'if pkgutil.find_loader("rest_framework") is not None:',
                'try:\n    import rest_framework\nexcept ImportError:\n    rest_framework = None\nif rest_framework is not None:'
            )
            
            # Write back
            with open(init_file, 'w') as f:
                f.write(new_content)
            print("✅ Successfully fixed django_filters compatibility!")
            
            # Show the fixed content
            print("📄 Fixed content:")
            new_lines = new_content.split('\n')
            for i in range(max(0, 5), min(len(new_lines), 15)):
                print(f"  {i+1}: {new_lines[i]}")
        else:
            print("ℹ️  pkgutil.find_loader not found or already fixed")
        break
else:
    print("❌ django_filters/__init__.py not found in site-packages")
    print("Available site-packages paths:")
    for path in site.getsitepackages():
        print(f"  - {path}")
