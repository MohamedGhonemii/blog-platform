import os
import site

# Find django_filters package
for path in site.getsitepackages():
    init_file = os.path.join(path, 'django_filters', '__init__.py')
    if os.path.exists(init_file):
        print(f"Found django_filters at: {init_file}")
        
        # Read the file
        with open(init_file, 'r') as f:
            content = f.read()
        
        # Replace the problematic line
        if "pkgutil.find_loader" in content:
            content = content.replace(
                "if pkgutil.find_loader(\"rest_framework\") is not None:",
                "try:\n    import rest_framework\nexcept ImportError:\n    rest_framework = None\nif rest_framework is not None:"
            )
            
            # Write back
            with open(init_file, 'w') as f:
                f.write(content)
            print("Fixed django_filters compatibility issue!")
        break
